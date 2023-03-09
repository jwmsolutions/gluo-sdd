import Alert from '../components/alert/Alert';
import '../scss/main.scss'

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      description: 'For proper styling, use one of the eight variants.',
      defaultValue: 'primary',
      control: { type: "select", options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ] },
      table: {
        type: { 
          summary: 'primary | secondary | success | danger | warning | info | light | dark',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    show: {
      description: 'Controls the visual state of the Alert.',
      defaultValue: true,
      control: 'boolean',
      table: {
        type: { 
          summary: 'true | false',
        },
        defaultValue: { summary: 'true' },
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.',
      },
    },
  }
};

export const API = (args) => (
  <Alert {...args}>Nulla eget auctor purus. Sed nulla eros, finibus hendrerit nisi in, consequat dignissim nulla.</Alert>
)

const AllVariantsTemplate = () => (
  <>
    {[
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
    ].map((variant) => (
      <Alert key={variant} variant={variant}>
        This is a {variant} alert—check it out!
      </Alert>
    ))}
  </>
)

export const AllVariants = AllVariantsTemplate.bind({});

const AllLinksVariantsTemplate = () => (
  <>
    {[
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
    ].map((variant) => (
      <Alert key={variant} variant={variant}>
        This is a {variant} alert with{' '}
        <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
        you like.
      </Alert>
    ))}
  </>
)

export const AllLinksVariants = AllLinksVariantsTemplate.bind({});
AllLinksVariants.parameters = {
  docs: {
    description: {
      story: 'For links, use the <Alert.Link> component to provide matching colored links within any alert.',
    },
  },
}

const AdditionalContentTemplate = (args) => (
  <Alert {...args}>
    <Alert.Heading>Heading</Alert.Heading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque nisl a imperdiet ornare. Duis volutpat porttitor sem tempus pellentesque. Aliquam scelerisque lacus justo.</p>
    <hr/>
    <p>Nulla eget auctor purus. Sed nulla eros, finibus hendrerit nisi in, consequat dignissim nulla. Nulla accumsan metus vitae diam consequat posuere.</p>
  </Alert>
)

export const AdditionalContent = AdditionalContentTemplate.bind({});
AdditionalContent.parameters = {
  docs: {
    description: {
      story: 'Alerts can contain whatever content you like. Headers, paragraphs, dividers, go crazy.',
    },
  },
}