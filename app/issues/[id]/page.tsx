import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

interface Props{
    params:{id:string}
}
 
const IssueDetailPage = async ({params}:Props) => {
    
  
     const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!issue)
    notFound();

    await delay(2000);



  return (
    <Grid  className='ml-4' columns={{initial:"1",md:"5"}} gap="5"  >
      <Box className='lg:col-span-4'>
      <IssueDetails issue={issue}/>
      </Box>

      <Box>
        <Flex direction="column" gap="4">
      <EditIssueButton issueId={issue.id}/>
      <DeleteIssueButton  issueId={issue.id}/>
        </Flex>
      </Box>
      


        
    </Grid>
  )
}

export default IssueDetailPage