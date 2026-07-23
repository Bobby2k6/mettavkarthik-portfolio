import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, Mail, Send } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const WEB3FORMS_ACCESS_KEY = '10e9cabc-019d-4422-a45f-1494e272552f'

function Contact() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (status === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--app-bg)]">
        <button
          onClick={() => router.history.back()}
          aria-label="Go back"
          className="fixed top-6 left-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border bg-background/80 backdrop-blur shadow-md hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-[var(--app-panel)] border border-[var(--app-border)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-[var(--app-accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--app-text)] mb-2">
            Message Sent!
          </h2>
          <p className="text-[var(--app-muted)] mb-6">
            Thanks for reaching out. I'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2 bg-[var(--app-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)]">
      <button
        onClick={() => router.history.back()}
        aria-label="Go back"
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border bg-background/80 backdrop-blur shadow-md hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[var(--app-text)] mb-2">Contact</h1>
        <p className="text-[var(--app-muted)] mb-8">
          Have a question or want to work together? Drop me a message.
        </p>

        <form
          name="contact"
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.currentTarget
            const formData = new FormData(form)
            formData.append('access_key', WEB3FORMS_ACCESS_KEY)
            formData.append('subject', `Portfolio contact from ${formData.get('name')}`)

            setStatus('sending')

            try {
              const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
              })
              const result = await response.json()

              if (result.success) {
                setStatus('sent')
                form.reset()
              } else {
                setStatus('error')
              }
            } catch {
              setStatus('error')
            }
          }}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--app-text)] mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 bg-[var(--app-panel)] text-[var(--app-text)] border border-[var(--app-border)] rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-[var(--app-accent)] outline-none transition-colors placeholder:text-[var(--app-muted)]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--app-text)] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-[var(--app-panel)] text-[var(--app-text)] border border-[var(--app-border)] rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-[var(--app-accent)] outline-none transition-colors placeholder:text-[var(--app-muted)]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[var(--app-text)] mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-2 bg-[var(--app-panel)] text-[var(--app-text)] border border-[var(--app-border)] rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-[var(--app-accent)] outline-none transition-colors resize-none placeholder:text-[var(--app-muted)]"
              placeholder="Your message..."
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-400">
              Something went wrong sending your message. Please try again, or email directly at mvkarthikeyan3@gmail.com.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--app-accent)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}