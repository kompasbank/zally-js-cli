import { getInput, setOutput, setFailed } from '@actions/core';

const fetchData = async (spec) => {
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

try {
    fetchData(getInput('spec'));
    setOutput('success', true);
} catch (error) {
    setFailed(error.message);
}
