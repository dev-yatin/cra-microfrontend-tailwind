const getFieldByType = (field) => {
  switch (field.type) {
    case "text":
    case "number":
    case "email":
      return (
        <>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id={`test`}
                type={field.type}
                key={field.name}
                name={field.name}
                className="block w-full rounded-md invalid:border-red-300 pr-10 invalid:text-red-900 invalid:placeholder-red-300 invalid:focus:border-red-500 focus:outline-none invalid:focus:ring-red-500 sm:text-sm"
                placeholder={field.placeholder}
                // aria-invalid="true"
                aria-describedby={field.label}
                required={field?.required || false}
                disabled={field?.readOnly}
                maxLength={field.maxLength}
                minLength={field.minLength}
              />
              {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div> */}
            </div>
            {/* <p className="mt-2 text-sm text-red-600" id="email-error">
              Your password must be less than 4 characters.
            </p> */}
          </div>
        </>
      );
    default:
      return <></>;
  }
};

export default getFieldByType;
