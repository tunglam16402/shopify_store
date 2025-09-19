import { recoveryCustomerAccount } from '@/actions/login'
import AuthForm from '@/components/common/AuthForm'

const Recovery = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h1>
        <AuthForm
          label="Email address"
          placeholder="Enter your email"
          buttonText="Send recovery email"
          fieldName="email"
          type="email"
          action={recoveryCustomerAccount}
        />
      </div>
    </div>
  )
}

export default Recovery
