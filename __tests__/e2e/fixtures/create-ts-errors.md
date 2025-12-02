This will get a TypeScript error.

<bl1nk-write path="src/bad-file.ts" description="This will get a TypeScript error.">
import NonExistentClass from 'non-existent-class';

const x = new Object();
x.nonExistentMethod();
</bl1nk-write>

EOM
