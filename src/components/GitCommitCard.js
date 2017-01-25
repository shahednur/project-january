//@flow
import React from 'react';
import { Element, HBox, VBox } from 'react-stylesheet';

import TimeAgo from 'react-timeago';

// import routes from '../../routes/index';
// const { commit: { Link: CommitLink } } = routes;
const CommitLink = ({ children }) => (
  <div>
    {children}
  </div>
);
const GhUserAvatar = (
  { avatar, nickname }: { avatar: string, nickname: string }
) => <img src={avatar} width="36" height="36" alt={`@${nickname}`} />;

const BoldColor = '#4e575b';

const GhCommitTitle = (
  {
    title,
    author,
    commit,
    repoName
  }: { title: string, author: string, commit: string, repoName: string }
) => (
  <CommitLink params={{ author, commit, repoName }}>
    <Element color={BoldColor} fontSize="15px" fontWeight="bold">
      {title}
    </Element>
  </CommitLink>
);

const MiddleBoldColor = '#767676';
const InlineBlock = ({ children, ...rest }) => (
  <Element display="inline-block" marginRight={5} {...rest}>
    {children}
  </Element>
);

const AuthorLink = ({ author, date }: { author: string, date: Date }) => (
  <Element color={MiddleBoldColor} fontSize="12px">
    <InlineBlock fontWeight={600}>
      {author}
    </InlineBlock>
    <InlineBlock>
      committed
    </InlineBlock>
    <InlineBlock>
      <TimeAgo date={date} />
    </InlineBlock>
  </Element>
);

// const GhLinkToCommit = () => (
//   <a
//     href="/lapanoid/project-january/commit/bbde42ac1f797524d13274497fd389bf21281aff"
//     class="sha btn btn-outline BtnGroup-item"
//   >
//     bbde42a
//   </a>
// );
// const BrowseRepoAtThisPoint = () => (
//   <a
//     href="/lapanoid/project-january/tree/bbde42ac1f797524d13274497fd389bf21281aff"
//     aria-label="Browse the repository at this point in the history"
//     class="btn btn-outline tooltipped tooltipped-sw"
//     rel="nofollow"
//   >
//     <svg
//       aria-hidden="true"
//       class="octicon octicon-code"
//       height="16"
//       version="1.1"
//       viewBox="0 0 14 16"
//       width="14"
//     >
//       <path
//         fill-rule="evenodd"
//         d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"
//       />
//     </svg>
//   </a>
// );
//
// const CopySha = () => (
//   <button
//     aria-label="Copy the full SHA"
//     class="js-zeroclipboard btn btn-outline BtnGroup-item zeroclipboard-button tooltipped tooltipped-s"
//     data-clipboard-text="bbde42ac1f797524d13274497fd389bf21281aff"
//     data-copied-hint="Copied!"
//     type="button"
//   >
//     <svg
//       aria-hidden="true"
//       class="octicon octicon-clippy"
//       height="16"
//       version="1.1"
//       viewBox="0 0 14 16"
//       width="14"
//     >
//       <path
//         fill-rule="evenodd"
//         d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
//       />
//     </svg>
//   </button>
// );
export type Props = {
  author: string,
  avatar: string,
  title: string,
  date: Date
};

export const getCommits = (parsed: Object): Props => {
  return {
    author: parsed.author.login,
    avatar: parsed.author.avatar_url,
    title: parsed.commit.message,
    date: new Date(parsed.commit.committer.date)
  };
};

/* <CopySha /> */
/* <GhLinkToCommit /> */
/* <BrowseRepoAtThisPoint /> */
export default ({ author, avatar, title, date }: Props) => (
  <HBox padding={10} border="1px solid #e5e5e5" backgroundOnHover="#f7fbfc">
    <Element marginRight={10}>
      <GhUserAvatar nickname={author} avatar={avatar} />
    </Element>
    <VBox justifyContent="space-between">
      <GhCommitTitle title={title} author={author} commit="" repoName="" />
      <AuthorLink date={date} author={author} />
    </VBox>
  </HBox>
);
