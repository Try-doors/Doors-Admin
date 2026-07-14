import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { AuthShell } from '#/components/forgot-password/auth-shell'
import { EmailStep } from '#/components/forgot-password/email-step'
import { NewPasswordStep } from '#/components/forgot-password/new-password-step'
import { OtpStep } from '#/components/forgot-password/otp-step'
import { SuccessModal } from '#/components/forgot-password/success-modal'

export const Route = createFileRoute('/forgot-password')({ component: ForgotPassword })

type Step = 'email' | 'otp' | 'password'

function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)

  return (
    <AuthShell>
      {step === 'email' && (
        <EmailStep email={email} onEmailChange={setEmail} onContinue={() => setStep('otp')} />
      )}
      {step === 'otp' && <OtpStep email={email || 'johndoe@gmail.com'} onVerify={() => setStep('password')} />}
      {step === 'password' && <NewPasswordStep onSave={() => setSaved(true)} />}

      {saved && <SuccessModal onContinue={() => navigate({ to: '/sign-in' })} />}
    </AuthShell>
  )
}
