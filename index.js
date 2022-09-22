#!/usr/bin/env node
import fs from 'fs';

const path = '/home/tom/Documents/vimwiki/jot.txt'

function getDate() {
  const date = Date().split(" ");
  for (let i = 0; i < 4; i++) date.pop();
  return date.join(" ");
}

// looks in process.argv for any arguments that may have been passed in
function parseArgs() {
  const args = process.argv;
  if (args[2] === '-r') {
    console.log(fs.readFileSync(path, 'utf-8'))
  } else if (args[2] === 'here') {
    jot(`${process.cwd()}/dir.jot.txt`, 3);
    console.log(process.cwd());
  } else {
    jot()
  }
}

function jot(customPath = path, argLoc = 2) {
  const arg = process.argv[argLoc];
  const date = getDate();
  fs.appendFileSync(`${customPath}`, `${date}\n\t${arg}\n\n`)
}

parseArgs()