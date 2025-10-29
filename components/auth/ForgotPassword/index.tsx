import { resetCustomerPassword } from '@/actions/login'
import AuthForm from '@/components/common/AuthForm'

interface IForgotPassword {
  resetUrl: string
}

const ForgotPassword = ({ resetUrl }: IForgotPassword) => {
  return (
    <div>
      <h1 className="text-3xl text-center sm:text-4xl font-bold text-slate-900">
        Reset password
      </h1>
      <AuthForm
        label="Password"
        placeholder="Enter your new password"
        buttonText="Submit"
        fieldName="password"
        type="password"
        action={resetCustomerPassword}
        extraFields={<input type="hidden" name="resetUrl" value={resetUrl} />}
      />
    </div>
  )
}

export default ForgotPassword
