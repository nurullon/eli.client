export const en = {
    header_component: {
        settings: 'Settings',
        logout: 'Log Out',
        do_you_want_to_log_out: 'Do you want to log out?',
        yes: 'Yes',
        no: 'No',
        language: 'Language'
    },
    pagination_component: {
        show_by: 'Show by'
    },
    translate_component: {
        active: 'Active',
        latin: 'Uzbek',
        cyrillic: 'Ўзбек',
        russian: 'Russian',
        english: 'English'
    },
    notification_component: {
        error: 'Error!',
        internal_server_error: 'Internal server error',
        success: 'Successful'
    },
    badge_component: {
        default: 'Default',
        created: 'Created',
        sent: 'Sent',
        rejected: 'Rejected',
        error: 'Error'
    },
    otp_component: {
        a_6_dig_code_has_ben_send_your_phone_number:
            'A 6-digit code has been sent to your phone number {phone_number}',
        enter_a_code: 'Enter the code',
        send: 'Send',
        resend_code: 'Resend code',
        resended_message: "Yangi kod yuborildi",
    },
    validations: {
        required_field: 'Required field',
        the_phone_number_was_not_entered_completely:
            'Please enter the phone number correctly',
        invalid_phone_number_code: 'Invalid phone number code. Allowed codes: ',
        invalid_password:
            "Kamida 8 ta belgi, kamida bitta katta va bitta kichik harf, faqat lotin harflari, kamida bitta raqam, faqat arab raqamlari, bo'sh joysiz, ruxsat etilgan boshqa belgilar:  ",
        invalid_email: "Yaroqsiz elektron pochta"
    },
    menu: {
        AuthView: 'Login',
        AuthRegisterWithEri: "Register",
        AuthLogin: "Login",
        DashboardNotFond: 'Page not found',
        DashboardTransactionsView: 'Loans',
        TransactionsView: 'Loans',
        ClientsTransactionsView: 'Client loans',
        DashboardClientsView: 'Clients',
        ClientsView: 'Clients',
        DashboardSettingsView: 'Settings',
        AccountsView: "Accounts",
    },
    error_page: {
        page_not_found: 'Page not found (404)!',
        go_home: 'Go home'
    },
    auth_view: {
        title: 'Login',
        login: 'Login',
        username: 'Username',
        password: 'Password',
        password_confirm: "Confirm Password",
        register: "Register",
        code: 'Code',
        phone_number: 'Phone number',
        reset_password: 'Reset password',
        sign_in: 'Login to the system'
    },
    transactions_page: {
        user_full_name: 'Full name',
        phone_number: 'Phone number',
        description: 'Description',
        status: 'Status',
        amount: 'Amount (UZS)',
        loan_type: 'Loan type',
        please_try_again_after: 'Please try again after {timer}',
        the_value_has_exceeded_the_given_limit:
            'The value has exceeded the given limit. Limit',
        the_minimum_limit_that_can_be_taken: 'The minimum limit that can be taken',
        sum: 'sum',
        annual_interest_rate: 'Annual interest rate',
        loan_period: 'Loan period',
        minimum_value: 'Minimum value',
        maximum_value: 'Maximum value',
        your_limit: 'Your limit',
        monthly_payment: 'Monthly payment',
        amount_value: 'Amount value',
        save: 'Save',
        credit_processing: 'Credit processing',
        qr_code_for_scanning: 'QR code for scanning',
        scan_the_qrcode_in_davr_mobile_app:
            'Scan the QR code in the Davr mobile app',
        close: 'Close',
        passport_series_and_number: 'Passport series and number',
        pinfl: 'PINFL',
        workplace: 'Workplace',
        average_salary: 'Average salary (UZS)',
        customer_information: 'Customer information',
        organization_information: 'Organization information',
        name: 'Name',
        account_number: 'Account number',
        secondary_account_number: 'Secondary account number',
        bank_branch: 'Bank branch (MFO)',
        inn: 'INN',
        secondary_bank_branch: 'Secondary bank branch (MFO)',
        credit_information: 'Credit information',
        month: 'month',
        approve: 'Approve',
        workplace_inn: 'Workplace INN',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        are_you_sure_you_want_to_delete: 'Are you sure you want to delete?',
        filter_of_status: 'Filter by status',
        credit_created_successfully: 'Credit successfully created!',
        credit_updated_successfully: 'Credit changed successfully!',
        credit_deleted_successfully: 'Credit deleted successfully!',
        verification_was_successful: 'Verification completed successfully!'
    },
    clients_page: {
        full_name: 'Full name',
        pinfl: 'PINFL',
        phone_number: 'Phone number',
        description: 'Description',
        status: 'Status',
        workplace: 'Workplace',
        workplace_inn: 'Workplace INN'
    },
    accounts_page: {
        add: "Add Account",
        edit: "Edit Account",
        account_delete_confirm: "Are you sure you want to delete the account?",
        account_deleted_successfully: "Account successfully deleted!",
        created_successfully: "Account successfully created",
        account_updated_successfully: "Account successfully updated",
        mfo_rule: "The bank MFO number must consist of 5 digits",
        account_rule: "The account number must consist of 20 digits",
        made_primary: "Make primary account",
        made_primary_done: "Primary account set",
    },
    eri_component: {
        eri_expired: "E-Imzo expiration date",
        eri_not_found: "E-Imzo not found",
        you_do_not_have_electronic_signature_keys_with_signing_authority:
            "You do not have electronic signature keys with signing authority",
    },
    // globals
    ERROR: "Error",
    MFO: "Bank MFO",
    Account: "Account number",
    telegram_unlink: "Leave from Telegram bot",
    gateway_view: {
        qr_code_for_log: "QR code for logging in via E-IMZO",
        use_the_application: "Use the E-IMZO app to scan the QR code",
        hash_for_scanning: "Hash for scanning the QR code",
        close: "Close"
    }

}
export default en
