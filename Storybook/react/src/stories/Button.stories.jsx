import Button from '../components/button/Button';
import '../scss/main.scss'
import '../scss/storybook/examples.scss'

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      description: 'Use any of the available button style types to quickly create a styled button. Just modify the variant prop.',
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
        'link',
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-danger',
        'outline-warning',
        'outline-info',
        'outline-light',
        'outline-dark'
      ] },
      table: {
        type: { 
          summary: 'primary | secondary | success | danger | warning | info | light | dark | link | outline-primary | outline-secondary | outline-success | outline-danger | outline-warning | outline-info | outline-light | outline-dark',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Fancy larger or smaller buttons? Add size="lg", size="sm" for additional sizes.',
      defaultValue: false,
      control: { type: "radio", options: {none: false, lg: 'lg', sm: 'sm'} },
      table: {
        type: { 
          summary: 'lg | sm ',
        },
        defaultValue: { summary: 'none' }
      }
    },
    active: {
      description: 'Make buttons look inactive by adding the disabled prop to.',
      defaultValue: false,
      control: 'boolean',
      table: {
        type: { 
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      }
    },
    disabled: {
      description: 'Make buttons look inactive by adding the disabled prop to.',
      defaultValue: true,
      control: 'boolean',
      table: {
        type: { 
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.',
      },
    },
  }
};

const Template = (args) => <Button {...args} >{args.children}</Button>;

export const API = Template.bind({});
API.args = {
  variant: 'primary',
  disabled: false,
  children: 'Button'
}

const TemplateSolidVariants = () => (
  <div className='example-btns'>
    {[
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
      'link',
    ].map((variant) => (
      <Button key={variant} variant={variant}>{variant}</Button>
    ))}
  </div>
)

export const AllSolidVariants = TemplateSolidVariants.bind({});

const TemplateOutlineVariants = () => (
  <div className='example-btns'>
    {[
      'outline-primary',
      'outline-secondary',
      'outline-success',
      'outline-danger',
      'outline-warning',
      'outline-info',
      'outline-light',
      'outline-dark',
    ].map((variant) => (
      <Button key={variant} variant={variant}>{variant.replace('outline-','')}</Button>
    ))}
  </div>
)

export const AllOutlineVariants = TemplateOutlineVariants.bind({});