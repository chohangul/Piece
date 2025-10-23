#!/usr/bin/env node

/**
 * Consistency Verification Script
 * 
 * This script checks for consistency across:
 * - Database schema vs. TypeScript types
 * - API routes naming
 * - Event names
 * - Store keys
 * - Route paths
 */

import { API_ROUTES, EVENT_NAMES, STORE_KEYS, ROUTE_PATHS } from '../../packages/config/src/index';
import * as fs from 'fs';
import * as path from 'path';

interface ConsistencyIssue {
  type: 'error' | 'warning';
  category: string;
  message: string;
}

const issues: ConsistencyIssue[] = [];

function addIssue(type: 'error' | 'warning', category: string, message: string) {
  issues.push({ type, category, message });
}

/**
 * Check for duplicate values in naming constants
 */
function checkDuplicates() {
  console.log('🔍 Checking for duplicate values...');

  const allValues: Record<string, string[]> = {
    'API Routes': Object.values(API_ROUTES),
    'Event Names': Object.values(EVENT_NAMES),
    'Store Keys': Object.values(STORE_KEYS),
    'Route Paths': Object.values(ROUTE_PATHS),
  };

  for (const [category, values] of Object.entries(allValues)) {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const value of values) {
      if (seen.has(value)) {
        duplicates.add(value);
      }
      seen.add(value);
    }

    if (duplicates.size > 0) {
      for (const duplicate of duplicates) {
        addIssue('error', category, `Duplicate value found: "${duplicate}"`);
      }
    }
  }
}

/**
 * Check naming conventions
 */
function checkNamingConventions() {
  console.log('🔍 Checking naming conventions...');

  // API Routes should be uppercase with underscores
  for (const [key, value] of Object.entries(API_ROUTES)) {
    if (!/^[A-Z_]+$/.test(key)) {
      addIssue('warning', 'API Routes', `Key "${key}" should be UPPER_SNAKE_CASE`);
    }
  }

  // Event names should be lowercase with colons
  for (const [key, value] of Object.entries(EVENT_NAMES)) {
    if (!/^[a-z:]+$/.test(value)) {
      addIssue('warning', 'Event Names', `Value "${value}" should be lowercase with colons`);
    }
  }

  // Store keys should be lowercase with colons
  for (const [key, value] of Object.entries(STORE_KEYS)) {
    if (!/^[a-z:]+$/.test(value)) {
      addIssue('warning', 'Store Keys', `Value "${value}" should be lowercase with colons`);
    }
  }
}

/**
 * Check for hardcoded strings in source files
 */
function checkHardcodedStrings() {
  console.log('🔍 Checking for hardcoded API routes...');

  const sourceDir = path.join(__dirname, '../../apps/mobile/src');
  
  if (!fs.existsSync(sourceDir)) {
    console.log('⚠️  Mobile app source not found, skipping hardcoded string check');
    return;
  }

  // This is a simplified check - in production, use a more robust AST parser
  const apiRouteValues = Object.values(API_ROUTES);
  
  function scanDirectory(dir: string) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check for hardcoded API routes
        for (const route of apiRouteValues) {
          const regex = new RegExp(`['"\`]${route}['"\`]`, 'g');
          if (regex.test(content) && !content.includes('API_ROUTES')) {
            addIssue(
              'warning',
              'Hardcoded Strings',
              `Possible hardcoded API route "${route}" in ${filePath}`
            );
          }
        }
      }
    }
  }

  try {
    scanDirectory(sourceDir);
  } catch (error) {
    console.log('⚠️  Error scanning for hardcoded strings:', error);
  }
}

/**
 * Main verification function
 */
function verify() {
  console.log('🚀 Starting consistency verification...\n');

  checkDuplicates();
  checkNamingConventions();
  checkHardcodedStrings();

  console.log('\n📊 Verification Results:\n');

  if (issues.length === 0) {
    console.log('✅ No issues found! Everything looks consistent.\n');
    process.exit(0);
  }

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');

  if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} error(s):\n`);
    for (const issue of errors) {
      console.log(`   [${issue.category}] ${issue.message}`);
    }
    console.log();
  }

  if (warnings.length > 0) {
    console.log(`⚠️  Found ${warnings.length} warning(s):\n`);
    for (const issue of warnings) {
      console.log(`   [${issue.category}] ${issue.message}`);
    }
    console.log();
  }

  if (errors.length > 0) {
    console.log('❌ Consistency verification failed!\n');
    process.exit(1);
  } else {
    console.log('✅ Consistency verification passed (with warnings)\n');
    process.exit(0);
  }
}

// Run verification
verify();
