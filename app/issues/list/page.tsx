import React from 'react'
import { Button,Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './IssueActions'




const IssuesPage = async() => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <div className='px-4'>
      <div className='pb-4'>
     <IssueActions/>
      </div>
     <Table.Root variant="surface">
      <Table.Header >
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell> 
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue=>(
        <Table.Row key={issue.id}>
          <Table.Cell>
            <Link href={`/issues/${issue.id}`} className='text-violet-600 hover:transition-opacity'>
            {issue.title}
            </Link>
            
          <div className='block md:hidden'>
            <IssueStatusBadge status={issue.status}/>

          </div>
          </Table.Cell>
          <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
          <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>

        </Table.Row>
      ))}</Table.Body>
     </Table.Root></div>
  )
}

export const dynamic ='force-dynamic'

export default IssuesPage