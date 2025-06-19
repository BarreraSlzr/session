#!/usr/bin/env bun

/**
 * Script to recursively search for TODO and FIXME comments in .ts and .tsx files.
 * Prints the file and line number for each match.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

function findTodos(dir: string) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === '.git' || entry === '.next') continue;
      findTodos(fullPath);
    } else if (['.ts', '.tsx'].includes(extname(entry))) {
      const lines = readFileSync(fullPath, 'utf-8').split('\n');
      lines.forEach((line, idx) => {
        if (/TODO|FIXME/i.test(line)) {
          console.log(`${fullPath}:${idx + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

findTodos(process.cwd()); 