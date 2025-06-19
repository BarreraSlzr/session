#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('search', { type: 'string', describe: 'Search for a term in onboarding, rules, or summaries' })
  .option('dir', { type: 'string', describe: 'Limit summaries to a specific directory' })
  .option('export', { type: 'string', describe: 'Export output to a file instead of stdout' })
  .option('summaries', { type: 'boolean', describe: 'Only print file-level summaries' })
  .help()
  .argv;

function printSection(title: string, out: string[]) {
  out.push(`\n=== ${title} ===\n`);
}

function printFile(filePath: string, out: string[]) {
  const content = fs.readFileSync(filePath, 'utf-8');
  out.push(`\n--- ${filePath} ---\n`);
  out.push(content);
}

function printFileLevelSummary(filePath: string, out: string[]) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/\/\*\*[\s\S]*?\*\//);
  if (match) {
    out.push(`\n--- ${filePath} (summary) ---\n`);
    out.push(match[0]);
  }
}

function searchInFile(filePath: string, term: string, out: string[]) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.toLowerCase().includes(term.toLowerCase())) {
    out.push(`\n--- ${filePath} ---\n`);
    // Print lines with the term and some context
    content.split('\n').forEach((line, i) => {
      if (line.toLowerCase().includes(term.toLowerCase())) {
        out.push(`${i + 1}: ${line}`);
      }
    });
  }
}

function main() {
  let output: string[] = [];
  const keyDirs = [
    'app/(auth)/lib/types',
    'app/(auth)/lib/schemas',
    'app/(auth)/lib/db/queries',
  ];

  if (argv.search) {
    printSection('SEARCH RESULTS', output);
    // Search onboarding, rules, and summaries
    searchInFile('docs/ONBOARDING.md', argv.search, output);
    fs.readdirSync('.cursor/rules').filter(f => f.endsWith('.md')).forEach(f => {
      searchInFile(path.join('.cursor/rules', f), argv.search, output);
    });
    for (const dir of keyDirs) {
      if (argv.dir && !dir.includes(argv.dir)) continue;
      fs.readdirSync(dir).filter(f => f.endsWith('.ts')).forEach(f => {
        searchInFile(path.join(dir, f), argv.search, output);
      });
    }
  } else if (argv.summaries) {
    printSection('FILE-LEVEL SUMMARIES', output);
    for (const dir of keyDirs) {
      if (argv.dir && !dir.includes(argv.dir)) continue;
      fs.readdirSync(dir).filter(f => f.endsWith('.ts')).forEach(f => {
        printFileLevelSummary(path.join(dir, f), output);
      });
    }
  } else {
    // Default: full onboarding
    printSection('ONBOARDING GUIDE', output);
    printFile('docs/ONBOARDING.md', output);
    printSection('CURSOR RULES', output);
    fs.readdirSync('.cursor/rules').filter(f => f.endsWith('.md')).forEach(f => {
      printFile(path.join('.cursor/rules', f), output);
    });
    printSection('FILE-LEVEL SUMMARIES', output);
    for (const dir of keyDirs) {
      if (argv.dir && !dir.includes(argv.dir)) continue;
      fs.readdirSync(dir).filter(f => f.endsWith('.ts')).forEach(f => {
        printFileLevelSummary(path.join(dir, f), output);
      });
    }
  }

  const result = output.join('\n');
  if (argv.export) {
    fs.writeFileSync(argv.export, result, 'utf-8');
    console.log(`Exported onboarding output to ${argv.export}`);
  } else {
    console.log(result);
  }
}

main(); 