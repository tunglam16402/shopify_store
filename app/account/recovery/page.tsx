import { recoveryCustomerAccount } from '@/actions/login'
import AuthForm from '@/components/common/AuthForm'

const Recovery = () => {
  return (
    <>
      <h1 className="text-3xl text-center sm:text-4xl font-bold text-slate-900">
        Forgot password
      </h1>
      <AuthForm
        label="Email address"
        placeholder="Enter your email"
        buttonText="Send recovery email"
        fieldName="email"
        type="email"
        action={recoveryCustomerAccount}
      />
    </>
  )
}

export default Recovery
