export default function TourImagesInfoForm({
  handleSubmit,
  formData,
  handleAddImage,
  handleDeleteNested,
  handleArrayInArrayChange,
}) {
  return (
    <section className="formTour__images formTour__section" id="images">
      <div className="container">
        <h2 className="formTour__section-title">Изображения:</h2>
        <form onSubmit={handleSubmit} className="formTour__form">
          <div className="formTour__field formTour__images-block">
            <div className="formTour__field-inputs">
              {formData.imges.map((img, index) => (
                <div key={index} className="formTour__images-field-row">
                  {img.image_url?.map((url, i) => {
                    const inputId = `images-${index}-detail-${i}`;
                    return (
                      <div key={i} className="formTour__field-detail">
                        <div>
                          <label htmlFor={inputId}>Изображение {i + 1}:</label>
                          <input
                            id={inputId}
                            value={url}
                            onChange={(e) =>
                              handleArrayInArrayChange(
                                "imges",
                                index,
                                "image_url",
                                i,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteNested("imges", index, "image_url", i)
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    );
                  })}
                  <div className="formTour__block-btn">
                    <button
                      type="button"
                      className="formTour__field-btn--add"
                      onClick={() => handleAddImage(index)}
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="formTour__btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}
