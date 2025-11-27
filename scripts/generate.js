const Handlebars = require('handlebars');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * 단일 사이트 생성
 * @param {string} configPath - 설정 파일 경로
 * @param {string} outputDir - 출력 디렉토리
 */
async function generateSite(configPath, outputDir) {
  try {
    console.log(chalk.blue(`📄 설정 파일 읽기: ${configPath}`));
    
    // 설정 파일 읽기
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    
    // 출력 디렉토리 생성
    await fs.ensureDir(outputDir);
    
    // 템플릿 디렉토리 경로
    const templateDir = path.join(__dirname, '..', 'template');
    
    // 생성할 페이지 목록 (디렉토리 구조로 생성하여 .html 확장자 제거)
    const pages = [
      { template: 'index.hbs', output: 'index.html' }, // 메인 페이지만 직접 생성
      { template: 'about.hbs', output: 'about/index.html' },
      { template: 'gallery.hbs', output: 'gallery/index.html' },
      { template: 'notice.hbs', output: 'notice/index.html' },
      { template: 'inquiry.hbs', output: 'inquiry/index.html' },
      { template: 'location.hbs', output: 'location/index.html' },
      { template: 'services/visit-care.hbs', output: 'services/visit-care/index.html' },
      { template: 'services/visit-bath.hbs', output: 'services/visit-bath/index.html' }
    ];
    
    // 각 페이지 생성
    for (const page of pages) {
      const templatePath = path.join(templateDir, page.template);
      
      if (!await fs.pathExists(templatePath)) {
        console.log(chalk.yellow(`⚠️  템플릿 파일을 찾을 수 없습니다: ${page.template}`));
        continue;
      }
      
      const outputPath = path.join(outputDir, page.output);
      const outputDirPath = path.dirname(outputPath);
      
      // 출력 디렉토리 생성 (about, services/visit-care 같은 하위 디렉토리)
      await fs.ensureDir(outputDirPath);
      
      // 템플릿 읽기 및 컴파일
      const templateContent = await fs.readFile(templatePath, 'utf8');
      const template = Handlebars.compile(templateContent);
      
      // HTML 생성
      const html = template(config);
      
      // HTML 파일 저장
      await fs.writeFile(outputPath, html, 'utf8');
      console.log(chalk.gray(`   ✓ ${page.output}`));
    }
    
    // CSS 파일 복사
    await fs.copy(
      path.join(templateDir, 'css'),
      path.join(outputDir, 'css')
    );
    
    // JS 파일 복사
    await fs.copy(
      path.join(templateDir, 'js'),
      path.join(outputDir, 'js')
    );
    
    // images 디렉토리 복사
    await fs.copy(
      path.join(templateDir, 'images'),
      path.join(outputDir, 'images')
    );
    
    console.log(chalk.green(`✅ 사이트 생성 완료: ${outputDir}`));
    console.log(chalk.gray(`   - CSS: ${path.join(outputDir, 'css')}`));
    console.log(chalk.gray(`   - JS: ${path.join(outputDir, 'js')}`));
    
    return outputDir;
  } catch (error) {
    console.error(chalk.red(`❌ 오류 발생: ${error.message}`));
    throw error;
  }
}

// 명령줄 인자 처리
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(chalk.yellow('사용법: node generate.js <config-file> <output-dir>'));
  console.log(chalk.gray('예시: node generate.js config/site-001.json sites/site-001'));
  process.exit(1);
}

const [configPath, outputDir] = args;

// 상대 경로를 절대 경로로 변환
const absoluteConfigPath = path.isAbsolute(configPath)
  ? configPath
  : path.join(__dirname, '..', configPath);

const absoluteOutputDir = path.isAbsolute(outputDir)
  ? outputDir
  : path.join(__dirname, '..', outputDir);

generateSite(absoluteConfigPath, absoluteOutputDir)
  .then(() => {
    console.log(chalk.green('\n🎉 완료!'));
    process.exit(0);
  })
  .catch((error) => {
    console.error(chalk.red(`\n💥 실패: ${error.message}`));
    process.exit(1);
  });
