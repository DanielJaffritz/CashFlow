import { useAuth } from 'hooks/authContext';
import { Link } from 'react-router';
import Menu from '~/components/profile/Menu';

const dashboard = () => {
  const {user} = useAuth();
  return (
    <div>
      {user && (
        <>
          <section className='flex flex-row'> 
            <Menu />
            <h1>FHAHFAUF</h1>
          </section>
        </>
      )}
    </div>
  )
}

export default dashboard