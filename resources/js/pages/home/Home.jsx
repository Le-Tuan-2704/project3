import { useContext } from 'react';

import TopBar from '../../components/topbar/TopBar';


export default function Home() {
    const { user } = useContext(AuthContext);
    var position = '';
    if( user && user.position ) position = user.position;
    
    return (
        <TopBar position={position}  />

    )
}