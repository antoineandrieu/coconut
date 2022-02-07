// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import ipfsClient from 'ipfs-http-client';

type Data = {
  name: string;
};

const auth =
  'Basic ' +
  Buffer.from(
    process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_PROJECT_SECRET
  ).toString('base64');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let bounty;
  try {
    console.log(req.query.cid);
    const response = await fetch(`https://ipfs.io/ipfs/${req.query.cid}`, {
      method: 'GET',
      headers: {
        authorization: auth,
      },
    });
    bounty = await response.json();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
  res.status(200).json(bounty);
}
