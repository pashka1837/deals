import Box from "../Box/Box";
import MySelect from "../MySelect";
import MyTextField from "../MyTextField";


export default function JobCard() {
    const job_type_options = [ 'Recall Job', 'Add Job'];
    const job_source_options = ['HeadHunter', 'LinkedIN'];
  return (
    <Box title="Job Type">
      <MySelect options={job_type_options} name='Job Type' />
      <MySelect options={job_source_options} name='Job Source' />
      <MyTextField 
      name='Job Desc' 
      placeHolder='Job Description (optional)' 
      required={false} />
    </Box>
  )
}