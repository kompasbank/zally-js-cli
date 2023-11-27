import { getInput, setFailed } from '@actions/core';
import fs from 'fs';

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
        throw new Error(`Violations found: ${JSON.stringify(json.violations, 0, 2)}`)
    }
}

const readFile = (file) => {
    return fs.readFileSync(file, 'utf-8');
}


try {
    const file = getInput('file');
    const specPaths = readFile(file)
    // Split specPaths on newlines and validate each spec
    for (const path of specPaths.split('\n')) {
        // If path is empty, skip
        if (path === '') {
            continue;
        }
        const spec = readFile(path);
        await validate(spec);
    }

} catch (error) {
    setFailed(error.message);
}
