import sgMail from '@sendgrid/mail'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@carrentalbenin.com',
      subject,
      html,
    }
    
    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error }
  }
}

export const sendBookingConfirmation = async (
  email: string,
  userName: string,
  carTitle: string,
  startDate: string,
  endDate: string,
  totalPrice: number
) => {
  const subject = 'Confirmation de votre réservation - Car Rental Bénin'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Confirmation de réservation</h2>
      <p>Bonjour ${userName},</p>
      <p>Votre réservation a été confirmée avec succès !</p>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Détails de la réservation :</h3>
        <p><strong>Véhicule :</strong> ${carTitle}</p>
        <p><strong>Date de début :</strong> ${startDate}</p>
        <p><strong>Date de fin :</strong> ${endDate}</p>
        <p><strong>Prix total :</strong> ${totalPrice.toLocaleString('fr-FR')} XOF</p>
      </div>
      
      <p>Merci de faire confiance à Car Rental Bénin !</p>
      <p>Cordialement,<br>L'équipe Car Rental Bénin</p>
    </div>
  `
  
  return sendEmail(email, subject, html)
}

export const sendBookingRejection = async (
  email: string,
  userName: string,
  carTitle: string,
  rejectionReason: string
) => {
  const subject = 'Réservation refusée - Car Rental Bénin'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Réservation refusée</h2>
      <p>Bonjour ${userName},</p>
      <p>Nous regrettons de vous informer que votre réservation a été refusée.</p>
      
      <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Détails :</h3>
        <p><strong>Véhicule :</strong> ${carTitle}</p>
        <p><strong>Motif du refus :</strong> ${rejectionReason}</p>
      </div>
      
      <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
      <p>Cordialement,<br>L'équipe Car Rental Bénin</p>
    </div>
  `
  
  return sendEmail(email, subject, html)
}