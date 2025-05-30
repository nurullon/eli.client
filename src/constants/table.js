export const deviceScreenWidth = window.innerWidth

export const transactionsTableColumns = [
    {
        title: 'transactions_page.user_full_name',
        dataIndex: 'full_name',
        key: 'full_name',
        width: deviceScreenWidth / 5,
        minWidth: '150px',
        maxWidth: '250px',
        fixed: 'left'
    },
    {
        title: 'transactions_page.phone_number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        width: '170px'
    },
    // {
    //     title: 'transactions_page.loan_type',
    //     dataIndex: 'loan_type',
    //     key: 'loan_type',
    //     width: '200px'
    // },
    {
        title: 'transactions_page.description',
        dataIndex: 'description',
        key: 'description',
        width: '250px'
    },
    {
        title: 'transactions_page.amount',
        dataIndex: 'amount',
        key: 'amount',
        width: '200px'
    },
    // {
    //     title: 'transactions_page.status',
    //     dataIndex: 'status',
    //     key: 'status',
    //     align: 'left',
    //     width: '120px'
    // },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        fixed: 'right',
        width: '65px'
    }
]

export const clientsTableColumns = [
    {
        title: 'clients_page.full_name',
        dataIndex: 'full_name',
        key: 'full_name',
        fixed: 'left',
        width: deviceScreenWidth / 5
    },
    {
        title: 'clients_page.pinfl',
        dataIndex: 'pinfl',
        key: 'pinfl'
    },
    {
        title: 'clients_page.phone_number',
        dataIndex: 'phone_number',
        key: 'phone_number'
    },
    {
        title: 'clients_page.workplace',
        dataIndex: 'workplace',
        key: 'workplace'
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        fixed: 'right',
        align: 'right',
        width: '150px'
    }
]
