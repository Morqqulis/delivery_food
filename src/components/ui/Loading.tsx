interface ILoading {}
import { DNA } from 'react-loader-spinner'
const Loading = () => {
   return (
      <DNA
         visible={true}
         height="200"
         width="200"
         ariaLabel="dna-loading"
         wrapperStyle={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
         wrapperClass="dna-wrapper"
      />
   )
}

export default Loading
