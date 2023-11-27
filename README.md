# Zally js cli action

This was created following this guide: 
https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action

This action calls a local running zally server, which validates the input from this action.

## Inputs

### `spec`

**Required** The spec to validate

## Outputs

### `success`

If the file was ok

## Example usage

```yaml
uses: actions/zally-js-cli-action@1234abcd
with:
  spec: '{openapi spec}'
```
