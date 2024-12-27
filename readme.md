# ts-morph

## querySelectorAll feature
This fork is a code essay that explores the possibilities and potential drawbacks of implementing css-like queries  searches for elements within a graph and for ts-morph library  
Summary: without classifications-level caching, this system does an unnecessary amount of work; classifications caching in a graph should be done at the level of the structure itself, not from the side.  
Working catalog: [packages/ts-morph/src/querySelectorAll](./packages/ts-morph/src/querySelectorAll/readme.md)

[![CI](https://github.com/dsherret/ts-morph/workflows/CI/badge.svg)](https://github.com/dsherret/ts-morph/actions?query=workflow%3ACI)

Monorepo for [ts-morph](packages/ts-morph) and related projects.

## Packages

- [ts-morph](packages/ts-morph) - TypeScript Compiler API wrapper. Provides an easier way to programmatically navigate and manipulate TypeScript and JavaScript code.
- [@ts-morph/bootstrap](packages/bootstrap) - Separate library for getting quickly setup with the Compiler API.

## Resources

- [TypeScript AST Viewer](https://ts-ast-viewer.com)
