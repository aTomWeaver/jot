#!/usr/bin/env node
import fs from 'fs';
import rc from "./jotrc.json" assert {type: "json"};

function getDate() {
  const date = Date().split(" ");
  for (let i = 0; i < 4; i++) date.pop();
  return date.join(" ");
}

const PATH = {
  current: rc.path,
  updatePath(newPath) {
    fs.writeFileSync('/Users/tom/Code/jot/jotrc.json', `{ "path": "${newPath}"}`);
    this.current = JSON.parse(fs.readFileSync('/Users/tom/Code/jot/jotrc.json')).path;
  }
}

// looks in process.argv for any arguments that may have been passed in
function parseArgs() {
  const args = process.argv;
  if (args[2] === '-r') {
    console.log(fs.readFileSync(PATH.current, 'utf-8'))
  } else if (args[2] === 'here') {
    const dir = process.cwd();
    const dirName = dir.split("/")[dir.split("/").length - 1]
    jot(`${dir}/${dirName}.jot.txt`, 3);
  } else if (args[2] === '--path-set') {
    PATH.updatePath(args[3])
    console.log(`new path is ${PATH.current}`)
  } else if (args[2] === '--path-get') {
    console.log(PATH.current);
  } else {
    jot();
  }
}

function jot(customPath = PATH.current, argLoc = 2) {
  const arg = process.argv[argLoc];
  const date = getDate();
  fs.appendFileSync(`${customPath}`, `${date}\n\t${arg}\n\n`)
}

parseArgs()

