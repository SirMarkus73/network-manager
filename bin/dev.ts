#!/usr/bin/env -S node --loader ts-node/esm --disable-warning=ExperimentalWarning
import "tsconfig-paths/register.js";
import { execute } from "@oclif/core";

await execute({ development: true, dir: import.meta.url });
