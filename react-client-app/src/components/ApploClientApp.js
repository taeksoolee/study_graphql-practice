import React from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
	CUSTOMER_SELECT_QUERY,
	CUSTOMER_ADD_MUTATION,
	// CUSTOMER_EDIT_MUTATION,
	// CUSTOMER_DELETE_MUTATION
} from './query.js';

export default function ApploClientApp() {
	const { loading, error, data, refetch } = useQuery(CUSTOMER_SELECT_QUERY);
	const [ addCustomer ] = useMutation(CUSTOMER_ADD_MUTATION);	

	return (
			<section>
				<div>
					{loading && 'loading...'}
					{!loading && error && 'error occured!'}
					{!loading && !error && data && (
						data.customers.map((c) => (
							<div>{c.id}, {c.name}, {c.age}, {c.email}</div>	
						))
					)}
				</div>

				<button 
					onClick={() => {
						addCustomer({
							variables: {
								name: 'taek',
								email: 'lts@google.com',
								age: 30,
							},
						}); 

						refetch();
					}
				}>Add Customer</button>
		</section>
	)
}