#!/usr/bin/env sh

set -e

npm run build

cd dist

git init 
git add -A
git commit -m 'New deployment'

git push -f git@github.com:onethreeonefour/games-wizards.io main:gh-pages

cd -