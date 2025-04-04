import React from "react";

import { Typography } from "neetoui";

const List = () => (
  <div className="flex h-full flex-col items-center justify-center p-2">
    <div className="mt-10 flex w-full items-start justify-between border-b-2 px-10 py-4">
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Typography style="h2" weight="bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
          <Typography className="text-gray-600" style="h4" weight="medium">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            itaque pariatur! Quam quaerat eveniet deleniti ducimus officia nam
            quidem, molestiae, totam iusto corporis molestias excepturi?
            Aspernatur iusto, placeat recusandae odit neque quas temporibus
            aperiam? Unde veritatis eveniet soluta debitis iste!
          </Typography>
        </div>
        <Typography className="text-gray-500" style="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam
          quis deleniti.
        </Typography>
      </div>
      <div className="h-36 w-64 rounded-lg border-2" />
    </div>
    <div className="mt-10 flex w-full items-start justify-between border-b-2 px-10 py-4">
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Typography style="h2" weight="bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
          <Typography className="text-gray-600" style="h4" weight="medium">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            itaque pariatur! Quam quaerat eveniet deleniti ducimus officia nam
            quidem, molestiae, totam iusto corporis molestias excepturi?
            Aspernatur iusto, placeat recusandae odit neque quas temporibus
            aperiam? Unde veritatis eveniet soluta debitis iste!
          </Typography>
        </div>
        <Typography className="text-gray-500" style="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam
          quis deleniti.
        </Typography>
      </div>
      <div className="h-36 w-64 rounded-lg border-2" />
    </div>
  </div>
);

export default List;
