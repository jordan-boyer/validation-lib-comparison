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

- [arktype](https://github.com/arktypeio/arktype) from David Blass
- [suretype](https://github.com/grantila/suretype) from Gustaf Räntilä
- [valibot](https://github.com/fabian-hiller/valibot) from Fabian Hiller
- [zod](https://github.com/colinhacks/zod) from Colin McDonnell
- [zod/mini](https://github.com/colinhacks/zod) from Colin McDonnell

| Date       | Score |  Library  | Deps  |  Size  | Light | Input A | Input B | Throw | Safe  | Script exec  |   Lib exec   | Fast  | Readability |
| ---------- | :---: | :-------: | :---: | :----: | :---: | :-----: | :-----: | :---: | :---: | :----------: | :----------: | :---: | :---------: |
| 2025-04-27 |   2   |  ArkType  |   2   | 148 KB |  _0_  |  **1**  |  **1**  |  _0_  | **1** | 878 ms _-1_  | 715 ms _-1_  |  _0_  |    **1**    |
| 2025-04-27 |   1   | Suretype  |   3   | 195 KB |  _0_  |   _0_   |   _0_   | **1** | **1** | 2477 ms _-1_ | 2312 ms _-1_ |  _0_  |    **1**    |
| 2025-04-27 |   8   |  Valibot  | **0** |  6 KB  | **1** |  **1**  |  **1**  | **1** | **1** | 69 ms **1**  |  8 ms **1**  | **1** |     _0_     |
| 2025-04-27 |   4   | @zod/mini |   1   | 22 KB  | **1** |  **1**  |   _0_   | **1** | **1** |  211 ms _0_  |  135 ms _0_  |  _0_  |     _0_     |
| 2025-04-27 |   8   |  Zod v3   | **0** | 60 KB  |  _0_  |  **1**  |  **1**  | **1** | **1** | 100 ms **1** | 32 ms **1**  | **1** |    **1**    |
| 2025-04-27 |   5   |  Zod v4   |   1   | 49 KB  |  _0_  |  **1**  |  **1**  | **1** | **1** |  224 ms _0_  |  146 ms _0_  |  _0_  |    **1**    |

Legend :

- Deps : the number of dependencies of the library
- Size : the minified build size in kilobytes of the related `.ts` file in `src`, run  `bun run build` to see by yourself
- Light : 1 point if the build is `<= 20 KB`
- Input A : 1 point if the library can see that `age` is `optional, number` in `type UserInput` but `not optional, number` in `type User` the output type
- Input B : 1 point if the library can see that `phone` is `optional, string or number` in `type UserInput` but `not optional, string` in `type User` the output type
- Throw : 1 point if the library have a parse or throw method, useful when we don't want to handle the error cases
- Safe : 1 point if the library have a safe parse method that will not throw and usually return a `Result` type
- Script exec : 1 point if the average time in ms to execute the test file with bun is `<= 100ms`, check the `bun run bench` command output
- Lib exec : 1 point if the average time in ms to execute the library is `<= 35ms`, check the `bun run check:once` command output
- Fast : 1 point if the library execution time is less than 100 ms
- Readability : 1 point if the library is easy to write & read, the syntax need to be intuitive

Test have been run on :

- Windows 11 x64
- AMD Ryzen 7 7800X3D, 64GB of RAM
- Bun v1.2.4

## My favorite pick

Zod is my favorite pick because it's fast and provide a better readability.

Ok the build size is bigger but it does not impact the performance that much.

The 35ms vs 11ms seems like a 3x difference but it's the time to run 1000 iterations. So in the end it's not that much of a difference in a real world scenario.

## Remarks

1. For some weird reason Zod v4 seems to be slower than Zod v3
2. Zod mini not handling the `or` operator is a blocker to me, hopefully it will be added in the future

## Todo

- [ ] vanilla version ?
- [ ] check error messages
- [ ] check custom error messages
- [ ] check custom validation rules
- [ ] check the perf without using `console`

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
