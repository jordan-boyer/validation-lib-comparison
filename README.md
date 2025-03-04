# Validation lib comparaison

[![Project license](https://img.shields.io/github/license/Shuunen/validation-lib-comparison.svg?color=informational)](https://github.com/Shuunen/validation-lib-comparison/blob/master/LICENSE)

## The goal of this project

The goal is to compare different libraries and approaches to validate data in a TypeScript ecosystem.

It's interesting to see how each library is designed, how it's used, and how it performs.

Ideally you can use this comparison to choose the library that fits your needs the best.

## Run tests and benchmarks

Make sure you have [Bun](https://bun.sh) v1.1.x then :

```bash
# install the dependencies
bun install
# run each file once just to verify that everything is working as expected
bun check:once
# run the benchmarks
bun bench
```

At the time of writing, Node 22 is around 2 times slower than Bun v1 ^^'

## The comparison results

Here are the library used in this comparison :

- [arktype](https://github.com/arktypeio/arktype) v2.0.4 from David Blass
- [valibot](https://github.com/fabian-hiller/valibot) v1.0.0-rc.1 from Fabian Hiller
- [zod](https://github.com/colinhacks/zod) v3.24.2 from Colin McDonnell

| Date       | Score | Library | Deps  |  Size  | Light | Input | Throw | Safe  | Execution | Fast  |
| ---------- | :---: | :-----: | :---: | :----: | :---: | :---: | :---: | :---: | :-------: | :---: |
| 2025-02-21 |   2   | arktype |   2   | 133 KB |   0   | **1** |   0   | **1** |  155 ms   |   0   |
| 2025-02-21 |   6   | valibot | **0** |  4 KB  | **2** | **1** | **1** | **1** |   74 ms   | **1** |
| 2025-02-21 |   4   |   zod   | **0** | 62 KB  |   0   | **1** | **1** | **1** |   75 ms   | **1** |

Legend :

- Deps : the number of dependencies of the library
- Size : the minified build size in bytes of the related file in `src`, run  `bun run build` to see by yourself
- Light : 1 point if the build is less than 10 KB, 1 bonus point if it's less than 5 KB
- Input : 1 point if the library can see that `age` is optional in the input but not optional in `type User` the output type
- Throw : 1 point if the library have a parse or throw method, useful when we don't want to handle the error cases
- Safe : 1 point if the library have a safe parse method that will not throw and usually return a `Result` type
- Execution : average time in milliseconds to execute the test file with bun, check the `bun run bench` command output
- Fast : 1 point if the library execution time is less than 100 ms

## My favorite pick

Valibot is my favorite pick because it's fast as Zod but has a lighter impact on the bundle size.

## Todo

- [ ] vanilla version ?
- [ ] check error messages
- [ ] check custom error messages
- [ ] check custom validation rules

## How to contribute

There are many ways to contribute to this project :

- Add a new library to the comparison
- Improve the comparison table, criteria, or scoring
- Improve the samples in `src`
- Find a way to enhance library isolation to have more meaningful benchmarks
- Whatever you think that could be useful, check the above todo list for inspiration

Just open an issue or a PR, I'll be happy to discuss it with you <3

## Thanks

- [Arktype](https://github.com/arktypeio/arktype) : for making this comparison possible
- [Bun](https://bun.sh) : for their great tool to do almost everything ^^
- [Github](https://github.com) : for all their great work year after year, pushing OSS forward
- [Repo-checker](https://github.com/Shuunen/repo-checker) : eslint cover /src code and this tool the rest ^^
- [Shields.io](https://shields.io) : for the nice badges on top of this readme
- [Valibot](https://github.com/fabian-hiller/valibot) : for making this comparison possible
- [Zod](https://github.com/colinhacks/zod) : for making this comparison possible
  
## Stargazers over time

[![Stargazers over time](https://starchart.cc/Shuunen/validation-lib-comparison.svg?variant=adaptive)](https://starchart.cc/Shuunen/validation-lib-comparison)

## Page views

[![Free Website Counter](https://www.websitecounterfree.com/c.php?d=9&id=65903&s=12)](https://www.websitecounterfree.com)
