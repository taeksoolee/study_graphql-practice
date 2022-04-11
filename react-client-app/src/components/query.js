// query.js
// query-example

import gql from 'graphql-tag';

export const CUSTOMER_SELECT_QUERY = gql`
	query {
		customers {
			id name email age
		}
	}
`;

export const CUSTOMER_ADD_MUTATION = gql`
	mutation AddCustomer($name: String!, $email: String!, $age: Int!) {
		addCustomer(name: $name, email: $email, age: $age) {
			id name email age
		}
	}
`;

export const CUSTOMER_EDIT_MUTATION = gql`
	mutation EditCustomer(
		$id: String!
		$name: String
		$email: String
		$age: Int
	) {
		editCustomer(id: $id, name: $name, email: $email, age: $age) {
			id name email age
		}
	}
`;

export const CUSTOMER_DELETE_MUTATION = gql`
	mutation DeleteCustomer($id: String!) {
		deleteCustomer(id: $id) {
			id
		}
	}
`;