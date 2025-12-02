import { getGithubUser } from "../handlers/github_handlers";

export async function getGitAuthor() {
  const user = await getGithubUser();
  const author = user
    ? {
        name: `[bl1nk]`,
        email: user.email,
      }
    : {
        name: "[bl1nk]",
        email: "git@dyad.sh",
      };
  return author;
}
