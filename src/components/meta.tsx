import { Meta, Title, useHead } from "@solidjs/meta";
import { createUniqueId } from "solid-js";

import { createMergeDefaultProps } from "~/utils";

const TITLE = "npmxt";
const DESCRIPTION = "npmxt";
const URL = "http://localhost:3000";
const IMAGE = "http://localhost:3000/og/main";

export namespace Base {
  export type Props = { title?: string; description?: string };
}

const mergeBaseDefaultProps = createMergeDefaultProps<Base.Props>({
  title: TITLE,
  description: DESCRIPTION,
});

export const Base = (props: Base.Props) => {
  props = mergeBaseDefaultProps(props);

  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
    </>
  );
};

export namespace OG {
  export type Props = { url?: string; title?: string; description?: string; image?: string };
}

const mergeOGDefaultProps = createMergeDefaultProps<OG.Props>({
  url: URL,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
});

export const OG = (() => {
  const use = (property: string, content?: string) => {
    useHead({
      tag: "meta",
      props: { property, content },
      id: createUniqueId(),
      get name() {
        return property;
      },
    });
  };

  return (props: OG.Props) => {
    props = mergeOGDefaultProps(props);

    use("og:type", "website");
    use("og:url", props.url);
    use("og:title", props.title);
    use("og:description", props.description);
    use("og:image", props.image);

    use("twitter:card", "summary_large_image");
    use("twitter:url", props.url);
    use("twitter:title", props.title);
    use("twitter:description", props.description);
    use("twitter:image", props.image);

    return null;
  };
})();
