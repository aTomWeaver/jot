#!/usr/bin/env node
import fs from 'fs';

// let path = '/home/tom/Documents/vimwiki/jot.txt'

class Path {
  constructor(userPath) {
    this.path = userPath;
  }
  get() {
    return this.path;
  }
  set(newPath) {
    this.path = newPath;
  }
}

const PATH = new Path('~/Documents');

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
  } else if (args[2] === '--path-set') {
    PATH.set(args[3]);
    // console.log(args[3])
    // console.log(`new path is ${Path.getPath()}`)
  } else if (args[2] === '--path-get') {
    console.log(PATH.get())
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