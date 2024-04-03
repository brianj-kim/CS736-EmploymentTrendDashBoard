# Employment Trend in Canada (provincial, occupational, and montly)

This is a class project for the CS736 Information Visualization master's course at the University of Regina. In order to implement a dash board, it manipulates a ten-year category (occupational) and provincial trend in Canadian employment history.

## Project Rationales

- **Customer**: Career Development Advisors in universities and high schools
- **Problem(s) to solve**: Customers might provide their students with guidance that is supported by rational and practical career options


## Technical Stack

- Backend: MongoDB Atlas ([https://www.mongodb.com](https://www.mongodb.com))
- Backend + Frontend: Next.js and TailwindCSS

## Data Reference

Statistics Canada. [Table 14-10-0431-01  Employment by occupation, economic regions, three-month moving average, unadjusted for seasonality](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410043101)

DOI: [https://doi.org/10.25318/1410043101-eng]( https://doi.org/10.25318/1410043101-eng)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
