import { problems } from "./problems.ts";

for (const p of (Deno.args.length > 0)
    ? problems.filter(p => p.number === parseInt(Deno.args[0]))
    : problems
) {
    console.log(`${p.number}. ${p.title}:`);
    console.log(p.solve());
    console.log();
}
