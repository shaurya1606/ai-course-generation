import { createContext,  } from 'react';
import { UserDetailsContextType } from '@/types/types';


export const UserDetailContext = createContext<UserDetailsContextType>({
	userDetail: {},
	setUserDetail: () => {},
});


