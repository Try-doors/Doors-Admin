export function checkPasswordRequirements(password: string) {
  return {
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
  }
}

export function passwordStrengthMeta(metCount: number) {
  const strengthLabel = metCount === 3 ? 'Strong' : metCount === 2 ? 'Medium' : 'Weak'
  const strengthColor = metCount === 3 ? '#17B26A' : metCount === 2 ? '#F79009' : '#DF1C41'
  return { strengthLabel, strengthColor }
}
