const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const Handlebars = require('handlebars');

/**
 * 모든 사이트 일괄 생성
 */
async function generateAll() {
  try {
    console.log(chalk.blue('🚀 모든 사이트 생성 시작...\n'));
    
    const configDir = path.join(__dirname, '..', 'config');
    const sitesDir = path.join(__dirname, '..', 'sites');
    
    // config 디렉토리 확인
    if (!await fs.pathExists(configDir)) {
      throw new Error(`config 디렉토리가 없습니다: ${configDir}`);
    }
    
    // sites 디렉토리 생성
    await fs.ensureDir(sitesDir);
    
    // config 디렉토리의 모든 JSON 파일 읽기
    const files = await fs.readdir(configDir);
    const configFiles = files.filter(file => file.endsWith('.json') && file !== 'site-template.json');
    
    if (configFiles.length === 0) {
      console.log(chalk.yellow('⚠️  생성할 설정 파일이 없습니다.'));
      console.log(chalk.gray('   config/ 디렉토리에 JSON 파일을 추가하세요.'));
      return;
    }
    
    console.log(chalk.blue(`📋 발견된 설정 파일: ${configFiles.length}개\n`));
    
    let successCount = 0;
    let failCount = 0;
    
    // 각 설정 파일로 사이트 생성
    for (const configFile of configFiles) {
      try {
        const configPath = path.join(configDir, configFile);
        const siteId = path.basename(configFile, '.json');
        const outputDir = path.join(sitesDir, siteId);
        
        console.log(chalk.cyan(`\n📦 처리 중: ${configFile}`));
        
        // 설정 파일 읽기
        const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
        
        // 템플릿 디렉토리 경로
        const templateDir = path.join(__dirname, '..', 'template');
        const templatePath = path.join(templateDir, 'index.hbs');
        
        // 템플릿 읽기 및 컴파일
        const templateContent = await fs.readFile(templatePath, 'utf8');
        const template = Handlebars.compile(templateContent);
        
        // HTML 생성
        const html = template(config);
        
        // 출력 디렉토리 생성
        await fs.ensureDir(outputDir);
        
        // 파일 저장 및 복사
        await fs.writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
        await fs.copy(path.join(templateDir, 'css'), path.join(outputDir, 'css'));
        await fs.copy(path.join(templateDir, 'js'), path.join(outputDir, 'js'));
        await fs.ensureDir(path.join(outputDir, 'images'));
        
        successCount++;
        console.log(chalk.green(`   ✅ ${siteId} 생성 완료`));
      } catch (error) {
        failCount++;
        console.error(chalk.red(`   ❌ ${configFile} 실패: ${error.message}`));
      }
    }
    
    console.log(chalk.blue(`\n📊 완료 통계:`));
    console.log(chalk.green(`   ✅ 성공: ${successCount}개`));
    if (failCount > 0) {
      console.log(chalk.red(`   ❌ 실패: ${failCount}개`));
    }
    console.log(chalk.blue(`\n📁 생성된 사이트: ${sitesDir}`));
    
  } catch (error) {
    console.error(chalk.red(`\n💥 오류 발생: ${error.message}`));
    process.exit(1);
  }
}

generateAll();
