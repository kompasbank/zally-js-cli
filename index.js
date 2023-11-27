import { getInput, setFailed } from '@actions/core';
import fs from 'fs';
import path from 'path';

const validate = async (spec) => {
    const res = await fetch('http://localhost:8000/api-violations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "api_definition": spec,
            "ignore_rules": [224]
        })
    })
    const json = await res.json()
    if (json.violations.length > 0) {
        throw new Error(`Violations found: ${JSON.stringify(json.violations)}`)
    }
}

const readFile = (file) => {
    console.log(`Reading file at path: ${path.join(process.env.GITHUB_ACTION_PATH, file)}`)
    const filePath = path.join(process.env.GITHUB_ACTION_PATH, file);
    const readFile = fs.readFileSync(filePath, 'utf-8');
    return readFile;
}


try {
    const file = getInput('file');
    console.log(`Reading file ${file}`)
    const specPaths = readFile(getInput('file'))
    for (const path of specPaths.split('\n')) {
        console.log(`Validating ${path}`)
        const spec = readFile(path);
        validate(spec);
    }

} catch (error) {
    setFailed(error.message);
}
