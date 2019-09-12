import { format as fnsFormat } from 'date-fns';

function formatDate(dateString) {
	return fnsFormat(new Date(dateString), 'LLL dd, yyyy');
}

export { formatDate };
