import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIdNews, updateNews, createNews } from "@/api/tours";
import "../FormTour/FormTour.scss";
import "./EditNews.scss";
import Logo from "@/components/logo/logo";

export default function EditNews({ add }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: [],
  });

  function transformContentFromDB(rawContent) {
    return rawContent.map((block) => {
      if (block.text) {
        const isMultiTextWithTitles =
          block.text.length > 1 && block.text[0].title;
        return {
          type: isMultiTextWithTitles ? "textWithTitles" : "text",
          text: block.text,
        };
      }

      if (block.img) {
        return {
          type: block.img.length > 1 ? "imageDouble" : "image",
          img: block.img,
        };
      }

      return block; // fallback
    });
  }
  function transformContentToDB(content) {
    return content.map((block) => {
      if (block.type === "text" || block.type === "textWithTitles") {
        return { text: block.text };
      }

      if (block.type === "image" || block.type === "imageDouble") {
        return { img: block.img };
      }

      return block;
    });
  }

  useEffect(() => {
    if (add) return;
    const fetchNews = async () => {
      try {
        const data = await getIdNews(id);
        const transformed = {
          ...data[0],
          content: transformContentFromDB(data[0].content),
        };
        setFormData(transformed);
      } catch (error) {
        console.error("Ошибка", error);
      }
    };
    fetchNews();
  }, [id]);

  const handleSubmit = async (news) => {
    if (news) {
      await createNews(formData);
      return;
    }
    const dataToSave = {
      ...formData,
      content: transformContentToDB(formData.content),
    };
    await updateNews(id, dataToSave);
  };

  const handleTextChange = (index, newText) => {
    const updated = [...formData.content];
    updated[index] = { text: [{ desc: newText }] };
    setFormData({ ...formData, content: updated });
  };

  const handleTwoTextChange = (index, i, field, value) => {
    const updated = [...formData.content];
    updated[index].text[i][field] = value;
    setFormData({ ...formData, content: updated });
  };

  const handleImageChange = (index, i, value) => {
    const updated = [...formData.content];
    updated[index].img[i] = value;
    setFormData({ ...formData, content: updated });
  };

  const addTextBlock = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { text: [{ desc: "Жопа" }] }],
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const addTwoTextBlock = () => {
    setFormData((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        {
          text: [
            { title: "Жопа", desc: "Жопа" },
            { title: "Жопа", desc: "Жопа" },
          ],
        },
      ],
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const addImageBlock = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { img: [""] }],
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const addTwoImageBlock = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { img: ["", ""] }],
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const removeBlock = (index) => {
    const updated = formData.content.filter((_, i) => i !== index);
    setFormData({ ...formData, content: updated });
  };

  const handleScip = () => {
    navigate("/admin");
  };

  useEffect(() => {
    if (add && formData.content.length === 0) {
      setFormData((prev) => ({
        ...prev,
        content: [
          {
            text: [
              {
                desc: "Жду контент",
              },
            ],
          },
          {
            text: [
              {
                title: "Жду контент",
                desc: "Жду контент",
              },
              {
                title: "Жду контент",
                desc: "Жду контент",
              },
            ],
          },
          {
            img: ["Жду контент"],
          },
          {
            img: ["Жду контент", "Жду контент"],
          },
        ],
      }));
    }
  }, [add, formData.content]);

  if (!formData) return <p>Новость не найдена</p>;

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <Logo admin />
          <button className="header__btn-exit" onClick={() => handleScip()}>
            Назад
          </button>
        </div>
      </header>
      <main>
        <section className="formNews__section">
          <h1 className="formTour__title" style={{ marginBottom: 50 }}>
            {add ? "Добавить новость" : "Редактировать новость"}
          </h1>
          <div className="container">
            <div className="add-buttons">
              <button onClick={addTextBlock}>Добавить длинный текст</button>
              <button onClick={addTwoTextBlock}>Добавить 2 текста</button>
              <button onClick={addImageBlock}>Добавить 1 картинку</button>
              <button onClick={addTwoImageBlock}>Добавить 2 картинки</button>
            </div>
            <div>
              <div className="formNews__title-block">
                <div>
                  <label htmlFor="title">Заголовок:</label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    placeholder="Заголовок новости"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="bg-img">Фон:</label>
                  <input
                    id="bg-img"
                    type="text"
                    value={formData.image}
                    placeholder="URL обложки"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {formData.content.map((block, index) => {
              if (block.text) {
                if (block.text.length === 1 && block.text[0].desc) {
                  return (
                    <div key={index} className="formNews__allText">
                      <div className="textarea__block-wrapper">
                        <label htmlFor={`allText-${index + 1}`}>
                          Описание:
                        </label>
                        <div className="textarea__block">
                          <textarea
                            id={`allText-${index + 1}`}
                            value={block.text[0].desc}
                            onChange={(e) =>
                              handleTextChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="fromNews__removeBlock"
                        onClick={() => removeBlock(index)}
                      >
                        Удалить блок
                      </button>
                    </div>
                  );
                }
                if (block.text.length === 2 && block.text[0].title) {
                  return (
                    <div key={index} className="formNews__text-wrapper">
                      <div>
                        {block.text.map((item, i) => (
                          <div key={i} className="formNews__text-block">
                            <label htmlFor={`title-text-${index}-${i}`}>
                              Заголовок:
                            </label>
                            <input
                              id={`title-text-${index}-${i}`}
                              value={item.title}
                              onChange={(e) =>
                                handleTwoTextChange(
                                  index,
                                  i,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Заголовок"
                            />
                            <div className="textarea__block-wrapper">
                              <label htmlFor={`desc-text-${index}-${i}`}>
                                Описание:
                              </label>
                              <div className="textarea__block">
                                <textarea
                                  id={`desc-text-${index}-${i}`}
                                  value={item.desc}
                                  onChange={(e) =>
                                    handleTwoTextChange(
                                      index,
                                      i,
                                      "desc",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Текст"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => removeBlock(index)}
                        className="fromNews__removeBlock"
                      >
                        Удалить блок
                      </button>
                    </div>
                  );
                }
              }

              if (block.img) {
                return (
                  <div key={index} className="formNews__img-block">
                    <div className="formNews__img-wrapper">
                      {block.img.map((img, i) => (
                        <div key={i}>
                          <label htmlFor={`img-${index}-${i}`}>
                            Изображение:
                          </label>
                          <input
                            id={`img-${index}-${i}`}
                            key={i}
                            value={img}
                            onChange={(e) =>
                              handleImageChange(index, i, e.target.value)
                            }
                            placeholder={`URL картинки ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="fromNews__removeBlock"
                      onClick={() => removeBlock(index)}
                    >
                      Удалить блок
                    </button>
                  </div>
                );
              }

              return null;
            })}

            <button className="formNews__btn-save" onClick={handleSubmit}>
              {add ? "Создать" : "Сохранить"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
