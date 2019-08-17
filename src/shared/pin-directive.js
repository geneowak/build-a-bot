// update and update hooks are so commonly used that there's a short hand
export default function(element, binding) {
  Object.keys(binding.value).forEach(position => {
    element.style[position] = binding.value[position];
  });
  element.style.position = 'absolute';
}
