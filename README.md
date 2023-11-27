# Zally js cli action

This was created following this guide: 
https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action

This action calls a local running zally server, which validates the input from this action.

## Inputs

### `file`

**Required** The file to find the openapi files in

## Example usage

```yaml
uses: actions/zally-js-cli-action@1234abcd
with:
  file: 'file_with_spec_paths.txt'
```

## Updating the action

Create a new tag:
```shell
git tag -a -m "New feature: bla bla" v0.4
```

Push the tag:
```shell
git push --follow-tags
```
