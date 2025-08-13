import type { NextApiRequest, NextApiResponse } from 'next';
import { fruits } from '../../data/fruits';

type FruitData = { fruits: string[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FruitData>
) {
  setTimeout(() => {
    res.status(200).json({ fruits });
  }, 500);
}
