#!/usr/bin/env node

/**
 * Cloudflare Pages 배포 스크립트
 * 
 * 사용법:
 *   node scripts/deploy-cloudflare.js site-001
 *   node scripts/deploy-cloudflare.js --all
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const SITES_DIR = path.join(__dirname, '../sites');
const args = process.argv.slice(2);

async function deploySite(siteName) {
    const sitePath = path.join(SITES_DIR, siteName);
    
    if (!await fs.pathExists(sitePath)) {
        console.error(chalk.red(`❌ 사이트를 찾을 수 없습니다: ${siteName}`));
        return false;
    }

    console.log(chalk.blue(`\n🚀 ${siteName} 배포 중...`));
    
    try {
        // Wrangler CLI를 사용한 배포
        // 먼저 wrangler 설치 필요: npm install -g wrangler
        // wrangler 로그인 필요: wrangler login
        
        const command = `wrangler pages deploy "${sitePath}" --project-name=${siteName}`;
        console.log(chalk.gray(`실행: ${command}`));
        
        execSync(command, { stdio: 'inherit' });
        
        console.log(chalk.green(`✅ ${siteName} 배포 완료!`));
        console.log(chalk.cyan(`   URL: https://${siteName}.itpage.kr`));
        
        return true;
    } catch (error) {
        console.error(chalk.red(`❌ ${siteName} 배포 실패:`), error.message);
        return false;
    }
}

async function deployAll() {
    const sites = await fs.readdir(SITES_DIR);
    const siteDirs = sites.filter(site => {
        const sitePath = path.join(SITES_DIR, site);
        return fs.statSync(sitePath).isDirectory();
    });

    console.log(chalk.blue(`\n📦 총 ${siteDirs.length}개 사이트 배포 시작...\n`));

    let successCount = 0;
    for (const site of siteDirs) {
        const success = await deploySite(site);
        if (success) successCount++;
    }

    console.log(chalk.green(`\n✨ 배포 완료: ${successCount}/${siteDirs.length}개 성공\n`));
}

async function main() {
    if (args.includes('--all') || args.includes('-a')) {
        await deployAll();
    } else if (args.length > 0) {
        const siteName = args[0];
        await deploySite(siteName);
    } else {
        console.log(chalk.yellow(`
사용법:
  node scripts/deploy-cloudflare.js <site-name>
  node scripts/deploy-cloudflare.js --all

예시:
  node scripts/deploy-cloudflare.js site-001
  node scripts/deploy-cloudflare.js --all

주의사항:
  1. Wrangler CLI 설치 필요: npm install -g wrangler
  2. Cloudflare 로그인 필요: wrangler login
  3. 각 사이트는 Cloudflare Pages에서 별도 프로젝트로 생성되어야 합니다
        `));
    }
}

main().catch(console.error);

