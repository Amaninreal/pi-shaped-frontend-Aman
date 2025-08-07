import type { NextApiRequest, NextApiResponse } from 'next';

type FruitData = {
  fruits: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FruitData>
) {
  // In a real app, this could be a database call.
  // We add a small delay to simulate network latency.
  setTimeout(() => {
    res.status(200).json({
      fruits: ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry'],
    });
  }, 500);
}